# HMX_AI_CONTEST
라스베가스 갈 사람들의 Repo

프로젝트 설명 : 대형화 되는 물류센터, 창고 등 물류 관련 공간 내에서 발생하는 작업자들의 안전 사고 방지를 위한 서비스 개발


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
