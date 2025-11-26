# 아르바이트 스케줄러 (Part-time Scheduler)

React + Spring Boot로 만든 **아르바이트 근무 스케줄 관리 웹 서비스**입니다.  
한 달 단위 달력에서 근무를 등록·수정·삭제하고, **휴게시간**과 **가게(알바 종류)별 시급**을 반영해 월급을 자동 계산해줍니다.

---

## 데모

- 프론트엔드(GitHub Pages):  
  https://zhhoo.github.io/parttime-scheduler/
- 백엔드(Render):  
  https://parttime-scheduler-backend.onrender.com

### 테스트 계정

- ID: `test`  
- 비밀번호: `1234`

(배포 시 서버가 시작될 때 기본 테스트 계정이 자동으로 생성되도록 되어 있습니다.)

---

## 주요 기능

### 1. 로그인 및 사용자별 스케줄
- 간단 로그인 화면
- `test / 1234` 계정으로 로그인 시, 해당 유저의 근무 스케줄만 조회
- 로그인 이후 달력 기반 스케줄 화면으로 이동

### 2. 달력 기반 근무 관리
- 현재 월 기준 달력 렌더링
- 날짜 클릭 시 **근무 추가 모달** 열림
- 이미 등록된 근무 클릭 시 근무 수정/삭제 모달 열림
- 주말/오늘 표시 등 기본적인 캘린더 UI 제공

### 3. 근무 상세 정보 입력
각 근무(Shift)마다 아래 정보를 저장합니다.

- 근무 날짜
- 시작 시간 / 종료 시간 (HH:MM)
- 메모 (근무 내용 / 장소 등)
- 근무 유형 / 가게 이름 (예: 편의점, 카페, 학원 등)
- 휴게 시간 (분 단위)
- 해당 근무의 시급 (원)
  - 입력하지 않으면 상단에서 설정한 **기본 시급** 사용

### 4. 자동 근무 시간 & 급여 계산

#### 월 단위 요약
- 이달 총 근무 시간 (시간 + 분)
- 이달 총 예상 급여  
  - 각 근무의 유효 근무시간 = (종료시간 - 시작시간 - 휴게시간)
  - 각 근무에 설정된 시급(없으면 기본 시급)을 곱해 합산

#### 일 단위 요약
- 선택한 날짜의 총 근무 시간
- 선택한 날짜의 예상 급여

#### 알바(가게) 유형별 요약
- `jobType`(근무 유형 / 가게 이름) 기준으로 그룹화
- 각 유형별:
  - 총 근무 시간
  - 총 예상 급여

---

## 기술 스택

### Frontend
- React (CRA, JavaScript)
- Axios (API 통신)
- GitHub Pages 배포

### Backend
- Spring Boot 3
- Spring Web / Spring Data JPA
- H2 Database (file 모드)
- Maven
- Docker (Render 배포용)

### Infra
- Frontend: GitHub Pages  
- Backend: Render (Docker 컨테이너)

---

## 프로젝트 구조

```bash
parttime-scheduler-full/
├─ backend/                # Spring Boot 백엔드
│  ├─ src/
│  ├─ pom.xml
│  └─ Dockerfile
└─ frontend/               # React 프론트엔드
   ├─ src/
   ├─ package.json
   └─ .env

---

이 프로젝트는:

알바생이 직접 쓰기 좋은, 현실적인 스케줄러

캘린더 UI + 휴게시간 + 가게별 시급까지 반영된 급여 계산

React + Spring Boot + GitHub Pages + Render 풀스택 배포 경험

을 담고 있습니다.