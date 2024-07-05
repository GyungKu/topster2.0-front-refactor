# 개선 사항

## 코드 리팩토링
- 기존 options api에서 composition api & script setup 으로 코드 리팩토링
- eslint, prettier 적용

## 버그 수정
- 로그인 후 accessToken이 있음에도 계속 refreshToken을 통해 요청하던 것 수정
  - accessToken을 체크할 때 JSON parsing을 안하고 있어서 수정
