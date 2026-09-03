import { supabase } from '../lib/supabase';
import type {
  QuoteEntity,
  QuoteItemEntity,
  QuoteStatusHistoryEntity,
  QuoteStatus
} from '../types/lead';

/**
 * Consulta de cotizaciones con ítems e información del lead vinculado
 */
export async function fetchQuotes(options?: {
  statusFilter?: string;
  searchTerm?: string;
}): Promise<{
  quotes: QuoteEntity[];
  totalQuotes: number;
  totalQuotedValue: number;
  acceptedTotalValue: number;
  acceptedCount: number;
  sentCount: number;
  draftCount: number;
}> {
  try {
    let query = supabase
      .from('quotes')
      .select('*, quote_items(*), automation_leads(*)')
      .order('created_at', { ascending: false });

    if (options?.statusFilter && options.statusFilter !== 'ALL') {
      query = query.eq('status', options.statusFilter);
    }

    if (options?.searchTerm && options.searchTerm.trim().length > 0) {
      const term = `%${options.searchTerm.trim()}%`;
      query = query.or(`quote_number.ilike.${term},client_name.ilike.${term},client_company.ilike.${term},client_email.ilike.${term}`);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Advertencia consultando cotizaciones (comprobar RLS / migración Fase 3):', error);
      return {
        quotes: [],
        totalQuotes: 0,
        totalQuotedValue: 0,
        acceptedTotalValue: 0,
        acceptedCount: 0,
        sentCount: 0,
        draftCount: 0
      };
    }

    const quotes = (data || []) as QuoteEntity[];

    let totalQuotedValue = 0;
    let acceptedTotalValue = 0;
    let acceptedCount = 0;
    let sentCount = 0;
    let draftCount = 0;

    quotes.forEach(q => {
      totalQuotedValue += Number(q.total) || 0;
      if (q.status === 'accepted') {
        acceptedCount++;
        acceptedTotalValue += Number(q.total) || 0;
      } else if (q.status === 'sent' || q.status === 'viewed') {
        sentCount++;
      } else if (q.status === 'draft') {
        draftCount++;
      }
    });

    return {
      quotes,
      totalQuotes: quotes.length,
      totalQuotedValue,
      acceptedTotalValue,
      acceptedCount,
      sentCount,
      draftCount
    };
  } catch (err) {
    console.warn('Excepción obteniendo cotizaciones:', err);
    return {
      quotes: [],
      totalQuotes: 0,
      totalQuotedValue: 0,
      acceptedTotalValue: 0,
      acceptedCount: 0,
      sentCount: 0,
      draftCount: 0
    };
  }
}

/**
 * Creación de una nueva cotización con consecutivo transaccional e ítems
 */
export async function createQuote(
  quoteHeader: Omit<QuoteEntity, 'id' | 'quote_number' | 'created_at' | 'updated_at'>,
  items: Omit<QuoteItemEntity, 'id' | 'quote_id' | 'created_at'>[]
): Promise<QuoteEntity> {
  const session = (await supabase.auth.getSession()).data.session;

  const payloadHeader = {
    ...quoteHeader,
    created_by: session?.user?.id || null
  };

  // 1. Insertar Encabezado
  const { data: createdQuote, error: headerError } = await supabase
    .from('quotes')
    .insert([payloadHeader])
    .select('*, automation_leads(*)')
    .single();

  if (headerError || !createdQuote) {
    console.error('Error creando encabezado de cotización:', headerError);
    throw headerError || new Error('No se pudo guardar la cotización.');
  }

  // 2. Insertar Ítems
  if (items.length > 0) {
    const formattedItems = items.map(item => ({
      ...item,
      quote_id: createdQuote.id
    }));

    const { error: itemsError } = await supabase
      .from('quote_items')
      .insert(formattedItems);

    if (itemsError) {
      console.error('Error guardando conceptos de la cotización:', itemsError);
    }
  }

  // 3. Consultar cotización completa con ítems
  const { data: fullQuote } = await supabase
    .from('quotes')
    .select('*, quote_items(*), automation_leads(*)')
    .eq('id', createdQuote.id)
    .single();

  return (fullQuote || createdQuote) as QuoteEntity;
}

/**
 * Actualización de un borrador de cotización
 */
export async function updateQuote(
  id: string,
  quoteHeader: Partial<QuoteEntity>,
  items?: Omit<QuoteItemEntity, 'id' | 'quote_id' | 'created_at'>[]
): Promise<QuoteEntity> {
  // 1. Actualizar Encabezado
  const { data: updatedHeader, error: headerError } = await supabase
    .from('quotes')
    .update({ ...quoteHeader, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*, automation_leads(*)')
    .single();

  if (headerError || !updatedHeader) {
    console.error('Error actualizando cotización:', headerError);
    throw headerError || new Error('No se pudo actualizar la cotización.');
  }

  // 2. Si se pasan ítems, reemplazar anteriores
  if (items) {
    await supabase.from('quote_items').delete().eq('quote_id', id);
    if (items.length > 0) {
      const formattedItems = items.map(item => ({
        ...item,
        quote_id: id
      }));
      await supabase.from('quote_items').insert(formattedItems);
    }
  }

  const { data: fullQuote } = await supabase
    .from('quotes')
    .select('*, quote_items(*), automation_leads(*)')
    .eq('id', id)
    .single();

  return (fullQuote || updatedHeader) as QuoteEntity;
}

/**
 * Transición de Estado de Cotización con Registro de Auditoría
 */
export async function changeQuoteStatus(
  id: string,
  newStatus: QuoteStatus,
  notes?: string
): Promise<QuoteEntity> {
  const { data, error } = await supabase
    .from('quotes')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*, quote_items(*), automation_leads(*)')
    .single();

  if (error || !data) {
    console.error('Error cambiando estado de cotización:', error);
    throw error || new Error('No se pudo cambiar el estado de la cotización.');
  }

  // Registrar auditoría manual si se agregaron notas personalizadas
  if (notes) {
    try {
      const session = (await supabase.auth.getSession()).data.session;
      await supabase.from('quote_status_history').insert([
        {
          quote_id: id,
          new_status: newStatus,
          user_email: session?.user?.email,
          notes: notes,
          created_at: new Date().toISOString()
        }
      ]);
    } catch (err) {
      console.warn('Advertencia registrando nota de auditoría:', err);
    }
  }

  return data as QuoteEntity;
}

/**
 * Duplicar Cotización creando una Nueva Versión
 */
export async function duplicateQuote(parentQuote: QuoteEntity): Promise<QuoteEntity> {
  const newVersionNumber = (parentQuote.version_number || 1) + 1;
  const items = parentQuote.items || [];

  const newHeader: Omit<QuoteEntity, 'id' | 'quote_number' | 'created_at' | 'updated_at'> = {
    automation_lead_id: parentQuote.automation_lead_id,
    version_number: newVersionNumber,
    parent_quote_id: parentQuote.id,
    status: 'draft',
    client_name: parentQuote.client_name,
    client_company: parentQuote.client_company,
    client_email: parentQuote.client_email,
    client_phone: parentQuote.client_phone,
    client_sector: parentQuote.client_sector,
    tax_rate: parentQuote.tax_rate,
    subtotal: parentQuote.subtotal,
    discount_total: parentQuote.discount_total,
    taxable_subtotal: parentQuote.taxable_subtotal,
    tax_amount: parentQuote.tax_amount,
    total: parentQuote.total,
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    payment_terms: parentQuote.payment_terms,
    notes: parentQuote.notes
  };

  const newItems = items.map(item => ({
    concept: item.concept,
    description: item.description,
    quantity: item.quantity,
    unit_price: item.unit_price,
    discount_percent: item.discount_percent,
    is_taxable: item.is_taxable,
    item_subtotal: item.item_subtotal
  }));

  return await createQuote(newHeader, newItems);
}

/**
 * Consulta de historial de cambios de estado para una cotización
 */
export async function fetchQuoteStatusHistory(quoteId: string): Promise<QuoteStatusHistoryEntity[]> {
  try {
    const { data, error } = await supabase
      .from('quote_status_history')
      .select('*')
      .eq('quote_id', quoteId)
      .order('created_at', { ascending: false });

    if (error) return [];
    return (data || []) as QuoteStatusHistoryEntity[];
  } catch {
    return [];
  }
}
