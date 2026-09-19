// app/api/join/route.ts
//
// POST target for the /join form.
// - Validates the submission
// - Inserts it into `businesses` with status='pending' (approval queue ON by default)
// - Returns success/failure to the form, which still also offers the WhatsApp
//   send button as a second, redundant notification path (per requirement #4)

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, region, town, whatsapp_number, description, photos } = body;

    // ---- Basic required-field validation ----
    if (!name || !category || !region || !town || !whatsapp_number) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, region, town, whatsapp_number are all required.' },
        { status: 400 }
      );
    }

    // ---- Photo count (matches the demo's min 3 / max 5 rule) ----
    // Optional for now since the upload UI isn't built yet — but if photos
    // ARE sent, they must already respect the rule. Once the upload pipeline
    // exists, remove the `if (photos)` guard to make this always-required.
    if (photos && (photos.length < 3 || photos.length > 5)) {
      return NextResponse.json(
        { error: 'Please upload between 3 and 5 photos.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // ---- Duplicate check: same business name already listed under a
    // different category — mirrors the check already enforced in the demo's
    // join wizard, so the real backend can't be bypassed to create the
    // exact duplicate the demo's UI already blocks. ----
    const { data: conflict } = await supabaseAdmin
      .from('businesses')
      .select('id, category')
      .ilike('name', name)
      .neq('category', category)
      .maybeSingle();

    if (conflict) {
      return NextResponse.json(
        { error: `"${name}" already appears under a different category. If that's a mistake, contact us directly instead of submitting again.` },
        { status: 409 }
      );
    }

    // Slug uniqueness: append a short suffix if the base slug is taken,
    // rather than failing the whole submission.
    const baseSlug = slugify(name);
    let slug = baseSlug;
    let attempt = 0;
    while (attempt < 5) {
      const { data: existing } = await supabaseAdmin
        .from('businesses')
        .select('id')
        .eq('slug', slug)
        .maybeSingle();
      if (!existing) break;
      attempt++;
      slug = `${baseSlug}-${attempt}`;
    }

    const { data, error } = await supabaseAdmin
      .from('businesses')
      .insert({
        name,
        slug,
        category,
        region,
        town,
        whatsapp_number,
        description: description || null,
        photos: photos || [],
        status: 'pending', // Approval queue default: ON. Never set this to 'approved' here.
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Could not save your submission. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, business: data });
  } catch (err) {
    console.error('Join route error:', err);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
