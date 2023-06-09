import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { kakao } from "../../api/userAPI";
import Swal from "sweetalert2";
import { useCallback, useEffect } from "react";
import { tokenAtom } from "../../atoms";
import { useSetRecoilState } from "recoil";

function KakaoLogin() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = queryString.parse(location.search);
	const SetToken = useSetRecoilState(tokenAtom);

	let code: any = queryParams.code;

	const onCodeSend = useCallback(
		async (code: string) => {
			try {
				const res = await kakao(code);

				// 로그인 요청 성공 시 토큰과 유저정보 저장 후 페이지 이동
				const result = res.data;
				if (res.status === 200) {
					// sessionStorage에 이메일과 닉네임 저장
					sessionStorage.setItem("userEmail", result.email);
					sessionStorage.setItem("userNick", result.nickname);
					// localStorage에 토큰 저장
					localStorage.setItem(
						"access_token",
						JSON.stringify(result.access_token)
					);
					localStorage.setItem(
						"refresh_token",
						JSON.stringify(result.refresh_token)
					);
					SetToken(JSON.stringify(result.access_token));
					//mainPage로 이동하기
					const Toast = Swal.mixin({
						toast: true,
						position: "top-end",
						showConfirmButton: false,
						timer: 1500,
						timerProgressBar: true,
						didOpen: (toast) => {
							toast.addEventListener("mouseenter", Swal.stopTimer);
							toast.addEventListener("mouseleave", Swal.resumeTimer);
						},
					});

					Toast.fire({
						icon: "success",
						title: `${result.nickname}님 안녕하세요!`,
					});
					navigate("/");
				}
			} catch (error: any) {
				const Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
					didOpen: (toast) => {
						toast.addEventListener("mouseenter", Swal.stopTimer);
						toast.addEventListener("mouseleave", Swal.resumeTimer);
					},
				});

				Toast.fire({
					icon: "success",
					title: `카카오로그인 실패! 다시 로그인해주세요`,
				});
				navigate("/login");
				console.log(error);
			}
		},
		[navigate, SetToken]
	);

	useEffect(() => {
		onCodeSend(code);
	}, [code, onCodeSend]);

	return (
		<>
			<div>
				<div style={{ textAlign: "center", marginTop: "40vh" }}>
					<h2 style={{ fontSize: "120px", fontWeight: "700" }}>
						카카오 로그인 성공
					</h2>
				</div>
			</div>
		</>
	);
}

export default KakaoLogin;
