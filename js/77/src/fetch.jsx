export async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        return await response.json();
      }
      catch (e) {
        console.error('ooops', e);
        throw e;
      }


}