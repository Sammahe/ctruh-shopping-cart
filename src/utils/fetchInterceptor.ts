export const fetchInterceptor = async (url: string, method: string, body?: BodyInit | null | undefined, contentType?: string)=> {
    let response;
    let request;

    request = await fetch(url, {
        method: method,
        headers: new Headers({
            "Content-Type": contentType || "application/json",
        }),
        body,
    });

    response = await request.json();

    return {request, response};
    
}