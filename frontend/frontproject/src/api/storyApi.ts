import axios, { AxiosResponse } from 'axios'

const BASE_URL = 'http://192.168.100.166/api' // 연결할 서버 ip주소로 바꾸기

// 내 서재 이야기 목록
export async function getStoryList(user_pk: number) {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL}/story/list/${user_pk}`,
  )
  return response
}

// 이야기 생성
export async function createStory(text: string, genre: string) {
  const response: AxiosResponse = await axios.post(`${BASE_URL}/story/test`, {
    text: text,
    genre: genre,
  })
  return response
}
// 이야기 가져오기
export async function getStory(id: number) {
  const response: AxiosResponse = await axios.get(`/api/story/${id}`)
  return response
}

// 이야기 저장
export async function postSaveStory(formData: object) {
  try {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/story/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return
  }
}

// 이야기 삭제
export async function deleteStory(id: number) {
  const response: AxiosResponse = await axios.delete(`/api/story/${id}`)
  return response
}
