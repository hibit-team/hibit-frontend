import { IAlarm } from "../../../interfaces/Alarm/IAlarm";

const tmpAlarmData: any = [
  {nickname: "애옹이", type: "COMMENT", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "1시간 전", url: "https://naver.com", readed: true},
  {nickname: "개죽이", type: "RECOMMENT", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "1시간 전", url: "https://naver.com", readed: false},
  {nickname: "시면준", type: "COMMENTHEART", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "1시간 전", url: "https://naver.com", readed: true},
  {nickname: "망고조아", type: "INVITATION", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "1시간 전", url: "https://naver.com", readed: false},
  {nickname: "애옹이", type: "OPENCHAT", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "1시간 전", url: "https://naver.com", readed: true},
  {nickname: "시면준아프지마", type: "ACCEPT", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "1시간 전", url: "https://naver.com", readed: true},
  {nickname: "재모기", type: "REFUSE", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "1시간 전", url: "https://naver.com", readed: true},
  {nickname: "관리자", type: "REMIND", content:"[23.07.01] 전시를 다녀오셨다면 게시글 상태를 변경해주세요.", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "1시간 전", url: "https://naver.com", readed: false},
  {nickname: "관리자", type: "REPORT", content:"회원님의 계정이 서비스 이용 수칙을 위반하여 신고되었습니다.", imglink: "", time: "1시간 전", url: "https://naver.com", readed: true},
  {nickname: "관리자", type: "EVENT", content:"[이벤트] They keep on asking me who is he", imglink: "", time: "1시간 전", url: "https://naver.com", readed: true},

  {nickname: "애옹이", type: "COMMENT", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "2시간 전", url: "https://naver.com", readed: true},
  {nickname: "개죽이", type: "RECOMMENT", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "2시간 전", url: "https://naver.com", readed: true},
  {nickname: "시면준", type: "COMMENTHEART", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "2시간 전", url: "https://naver.com", readed: false},
  {nickname: "망고조아", type: "INVITATION", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "2시간 전", url: "https://naver.com", readed: true},
  {nickname: "애옹이", type: "OPENCHAT", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "2시간 전", url: "https://naver.com", readed: true},
  {nickname: "시면준아프지마", type: "ACCEPT", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "2시간 전", url: "https://naver.com", readed: false},
  {nickname: "재모기", type: "REFUSE", content:" ", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "2시간 전", url: "https://naver.com", readed: true},
  {nickname: "관리자", type: "REMIND", content:"[23.07.23] 전시를 다녀오셨다면 게시글 상태를 변경해주세요.", imglink: "https://i.imgur.com/fsyrScY.jpg", time: "2시간 전", url: "https://naver.com", readed: true},
  {nickname: "관리자", type: "REPORT", content:"회원님의 계정이 서비스 이용 수칙을 위반하여 신고되었습니다.", imglink: "", time: "2시간 전", url: "https://naver.com", readed: true},
  {nickname: "관리자", type: "EVENT", content:"[이벤트] They keep on asking me who is he", imglink: "", time: "2시간 전", url: "https://naver.com", readed: true},
];

export default tmpAlarmData;