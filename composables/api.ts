export const apiPostRequest = async (url: string, body: object) => {
  const apiCall = HTTP();
  const data = ref();
  const error = ref(null);
  try {
    const result = await apiCall({
      method: "post",
      url: url,
      data: body,
    });    
    data.value = result.data;
  } catch (err: any) {
    error.value = err.response.data.error;
  }

  return { data: data.value, error: error.value };
};