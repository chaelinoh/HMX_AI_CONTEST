# HMX_AI_CONTEST
라스베가스 갈 사람들의 Repo

프로젝트 설명 : 대형화 되는 물류센터, 창고 등 물류 관련 공간 내에서 발생하는 작업자들의 안전 사고 방지를 위한 서비스 개발  

○ 필요성
- 작업 현장의 높은 재해율 경감을 위해서는 그동안 전통적인 방법에서 탈피하여, IT를 활용한 근본적인 취약성 및 원인분
석 방법을 통한 개선이 필요함 - 작업 현장의 유해요인 및 작업자 행동 위험요인으로부터 근로자를 보호하기 위해서는 설비 등의 환경과 근로자 보호구
및 행동 패턴 등의 분석이 필요함 - 이러한 문제점 개선을 위해서는 사고예측, 시나리오, 위치정보, 위험설비 등 요소를 통한 시스템 구축이며, 최우선 개선
을 위해서 작업 현장의 데이터 정보화가 필요함


[백엔드]
language : python  
framework :  Flask  
api : ...ing (restful api)  
서버 : nginx or apache  
형상관리 : git  
ide : VSCODE  

  
[AI 모델]  
커스템 데이터셋 : https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&dataSetSn=510  
모델 아키텍처 : YOLOv8m or YOLOv8l  
  
모델 상세(ultralytics git 발췌) :  
scales: # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'
  
[depth, width, max_channels]  
m: [0.67, 0.75, 768] # YOLOv8m summary: 295 layers, 25902640 parameters, 25902624 gradients,  79.3 GFLOPs  
l: [1.00, 1.00, 512] # YOLOv8l summary: 365 layers, 43691520 parameters, 43691504 gradients, 165.7 GFLOPs
