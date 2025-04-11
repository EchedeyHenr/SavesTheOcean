export const GET = async <T>(url: string): Promise<T> => {
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error(`GET request failed: ${response.status}`);
  return response.json();
};

export const POST = async <T>(url: string, body: any): Promise<T> => {
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`POST request failed: ${response.status}`);
  return response.json();
};

export const PUT = async <T>(url: string, body: any): Promise<T> => {
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`PUT request failed: ${response.status}`);
  return response.json();
};

export const DELETE = async (url: string): Promise<void> => {
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error(`DELETE request failed: ${response.status}`);
};