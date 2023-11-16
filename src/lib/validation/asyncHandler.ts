export async function asyncHandler(
  validator: (value: string) => boolean,
  value: string,
) {
  try {
    if (value.length > 0) {
      validator(value);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
