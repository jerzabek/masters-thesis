/**
 * Conversion to base64
 */
export const toBase64 = (file: File | Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
