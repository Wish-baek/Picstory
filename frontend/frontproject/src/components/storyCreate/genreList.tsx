import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {
	ImageBit,
	genreAtom,
	loadingAtom,
	storyEn,
	storyKo,
	voiceAtom,
} from "../../atoms";
import { createStory, createVoice, translateStory } from "../../api/storyApi";
import Loading from "./loading";
import styles from "../../assets/css/genreList.module.css";

export default function ImageUpload() {
	const [genre, setGenre] = useRecoilState(genreAtom);
	const [loading, setLoading] = useRecoilState(loadingAtom);
	const [text, setText] = useState(""); // 이미지 켑셔닝 결과
	const [storyKorean, setStoryKorean] = useRecoilState(storyKo);
	const [storyEnglish, setStoryEnglish] = useRecoilState(storyEn);
	const [voice, setVoice] = useRecoilState(voiceAtom);

	const navigate = useNavigate();

	const clickGenre = (e: any) => {
		e.target.classList.add("active");
		setGenre(e.target.value);
	};
	const next = () => {};

	const items = ["재미", "슬픔", "공포", "로맨스"];

	const Image = useRecoilValue(ImageBit);
	const Image2 = Image.substring(23);

	const ImageCaptioning = async () => {
		runClip();
	};

	const runClip = async () => {
		setLoading(true);
		const raw = JSON.stringify({
			user_app_id: {
				user_id: "clarifai",
				app_id: "main",
			},
			inputs: [
				{
					data: {
						image: {
							base64: Image2,
						},
					},
				},
			],
		});

		const info = {
			detailImageFile: Object,
			detailImageUrl: String,
		};

		const requestOptions = {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: "Key " + "65a4f037b024440db6d5786d9c868030",
			},
			body: raw,
		};

  const sendContent = async (text: string, genre: string) => {
    setText(text)
    setLoading(false)
    const response = await createStory(text, genre)
    if (response.status === 200) {
      console.log(response.data)
      // setStoryEnglish(response.data)
      navigate('/storyResult')
      makeVoice()
      translate()
    }
  }

  const makeVoice = async () => {
    // const response = await createVoice(story, genre)
    // setVoice(response.data)
  }

  const translate = async () => {
    // const response = await translateStory(story)
    // setStoryKorean(response.data)
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={styles.container}>
            {items.map((item, idx) => {
              let id = 'genreBtn-' + (idx + 1)
              return (
                <>
                  <input
                    id={styles[`${id}`]}
                    type="radio"
                    name="gerne"
                    value={items[idx]}
                    onChange={clickGenre}
                  ></input>

	const sendContent = async (text: string, genre: string) => {
		setText(text);
		setLoading(false);
		const response = await createStory(text, genre);
		if (response.status === 200) {
			// console.log("response.data:", response);
			setStoryEnglish(response.data.content);
			navigate("/storyResult");
			// makeVoice()
			translate();
		}
	};

	const makeVoice = async () => {
		const response = await createVoice(storyEnglish, genre);
		setVoice(response.data);
		console.log(response.data)
	};

	const translate = async () => {
		console.log("storyEnglish:",storyEnglish)
		const response = await translateStory(storyEnglish);
		setStoryKorean(response.data);
		console.log(response.data)
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div>
					<div className={styles.container}>
						{items.map((item, idx) => {
							let id = "genreBtn-" + (idx + 1);
							return (
								<>
									<input
										id={styles[`${id}`]}
										type="radio"
										name="gerne"
										value={items[idx]}
										onChange={clickGenre}
									></input>

									<label
										className={
											items[idx] == genre
												? `${styles.genre_label_active}`
												: `${styles.genre_label}`
										}
										htmlFor={styles[`${id}`]}
									>
										{items[idx]}
									</label>
								</>
							);
						})}
					</div>
					<button className={styles.createBtn} onClick={ImageCaptioning}>
						이야기 만들기
					</button>
				</div>
			)}
		</>
	);
}