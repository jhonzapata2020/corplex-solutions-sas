const supabaseUrl = 'https://ehfejbgzronpllbeyzqj.supabase.co';
const supabaseKey = 'sb_publishable_FSpWxlR-VroEmMKOV2Tl9w_p2tpOcJJ';

async function testQuery() {
  console.log('--- TEST 1: Select * sin order ---');
  const res1 = await fetch(`${supabaseUrl}/rest/v1/automation_leads?select=*`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  console.log('Status 1:', res1.status, res1.statusText);
  const data1 = await res1.json();
  console.log('Respuesta 1:', data1);

  console.log('\n--- TEST 2: Select * con order=created_at.desc ---');
  const res2 = await fetch(`${supabaseUrl}/rest/v1/automation_leads?select=*&order=created_at.desc`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  console.log('Status 2:', res2.status, res2.statusText);
  const data2 = await res2.json();
  console.log('Respuesta 2:', data2);
}

testQuery();
