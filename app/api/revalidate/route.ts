import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
    _type?: string
}

export async function POST(req: NextRequest) {
    const sharedSecret = process.env.SANITY_REVALIDATE_SECRET || process.env.REVALIDATE_SECRET

    if (!sharedSecret) {
        return NextResponse.json(
            { message: 'Missing SANITY_REVALIDATE_SECRET (or legacy REVALIDATE_SECRET).' },
            { status: 500 },
        )
    }

    const headerSecret = req.headers.get('x-revalidate-secret')

    if (headerSecret) {
        if (headerSecret !== sharedSecret) {
            return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
        }

        revalidateTag('sanity', 'max')
        revalidatePath('/')

        return NextResponse.json({ revalidated: true, mode: 'header-secret' })
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, sharedSecret)

    if (!isValidSignature) {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    revalidateTag('sanity', 'max')

    if (body?._type) {
        revalidateTag(body._type, 'max')
    }

    revalidatePath('/')

    return NextResponse.json({
        revalidated: true,
        revalidatedType: body?._type ?? null,
        mode: 'sanity-webhook',
    })
}
