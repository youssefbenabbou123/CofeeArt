import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://coffee-arts-backend.railway.app';

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return proxyRequest(request, params.path);
}

export async function POST(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return proxyRequest(request, params.path);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return proxyRequest(request, params.path);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return proxyRequest(request, params.path);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return proxyRequest(request, params.path);
}

async function proxyRequest(request: NextRequest, pathSegments: string[]) {
    const path = pathSegments.join('/');
    const url = `${BACKEND_URL}/api/${path}`;

    // Get the request body for non-GET requests
    let body: string | undefined;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        try {
            body = await request.text();
        } catch {
            body = undefined;
        }
    }

    // Forward headers (excluding host)
    const headers: HeadersInit = {};
    request.headers.forEach((value, key) => {
        if (key.toLowerCase() !== 'host') {
            headers[key] = value;
        }
    });

    try {
        const response = await fetch(url, {
            method: request.method,
            headers,
            body: body || undefined,
        });

        // Get response body
        const responseBody = await response.text();

        // Create response with same status and headers
        const responseHeaders = new Headers();
        response.headers.forEach((value, key) => {
            // Don't forward these headers
            if (!['content-encoding', 'transfer-encoding', 'content-length'].includes(key.toLowerCase())) {
                responseHeaders.set(key, value);
            }
        });

        return new NextResponse(responseBody, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json(
            { success: false, message: 'Backend connection failed' },
            { status: 502 }
        );
    }
}
