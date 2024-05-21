import { postJson } from 'utils/api'

import * as I from './interface'
import * as R from './routes'

/**
 * Uploads an image to the CDN.
 *
 * @param file Bas64 encoded image.
 */
export const uploadImage = (file: File) => {
  const formData = new FormData()

  formData.append('file', file)

  return postJson<I.ImageUploadResponse>(R.uploadImage(), formData)
}
