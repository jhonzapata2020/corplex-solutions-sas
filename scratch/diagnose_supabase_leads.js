const supabaseUrl = 'https://ehfejbgzronpllbeyzqj.supabase.co';
const supabaseKey = 'sb_publishable_FSpWxlR-VroEmMKOV2Tl9w_p2tpOcJJ';

async function diagnose() {
  console.log('=== DIAGNÓSTICO SUPABASE REST LEADS ===');
  console.log('URL Proyecto:', supabaseUrl);
  console.log('Publishable Key:', supabaseKey.slice(0, 18) + '...');

  // 1. Fetch REST directo de automation_leads
  try {
    const rawRes = await fetch(`${supabaseUrl}/rest/v1/automation_leads?select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'count=exact'
      }
    });

    const status = rawRes.status;
    const statusText = rawRes.statusText;
    const contentRange = rawRes.headers.get('content-range');
    const rawData = await rawRes.json();

    console.log('\n--- Consulta REST HTTP (apikey anon) ---');
    console.log('Status HTTP:', status, statusText);
    console.log('Content-Range Header:', contentRange);
    console.log('Body tipo:', typeof rawData, Array.isArray(rawData) ? `Array length: ${rawData.length}` : 'Objeto');

    if (Array.isArray(rawData)) {
      console.log(`\n✅ PostgREST respondió con array. Filas visibles: ${rawData.length}`);
      if (rawData.length > 0) {
        console.log('\nEjemplo de lead #1 en Supabase:');
        console.log(JSON.stringify(rawData[0], null, 2));
      } else {
        console.log('\n⚠️ PostgREST devolvió 0 filas [].');
        console.log('Causa: RLS (Row Level Security) está activo en automation_leads y NO permite SELECT para rol anon.');
      }
    } else {
      console.log('\n❌ Error o respuesta inesperada:', rawData);
    }
  } catch (err) {
    console.error('Excepción de conexión:', err);
  }
}

diagnose();
