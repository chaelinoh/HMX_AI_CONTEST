import os
import json
import pandas as pd
from tqdm import tqdm
from collections import defaultdict

# 데이터셋 경로 설정
DATASET_DIR = r'F:\121.물류창고 내 작업 안전 데이터\01.데이터\1.Training\라벨링데이터'

# JSON 파일이 저장된 경로를 리스트로 저장
json_file_paths = []

for root, dirs, files in os.walk(DATASET_DIR):
    for file in files:
        # print(file)
        if file.lower().endswith('.json'):
            json_file_paths.append(os.path.join(root, file))

# 통계 정보를 저장할 변수들 초기화
image_stats = []
class_counts = defaultdict(int)
total_bboxes = 0
total_segmentations = 0

# JSON 파일들을 순회하며 데이터 수집
for json_file in tqdm(json_file_paths, desc='Processing JSON files'):
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except UnicodeDecodeError:
        # 다른 인코딩 시도
        with open(json_file, 'r', encoding='cp949') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error reading {json_file}: {e}")
        continue

    # 이미지 파일명 추출
    source_data_info = data.get('Source data Info.', {})
    image_filename = source_data_info.get('source_data_ID', '') + '.' + source_data_info.get('file_extension', '')

    # 어노테이션 정보 추출
    learning_data_info = data.get('Learning data info.', {})
    annotations = learning_data_info.get('annotation', [])

    num_objects = len(annotations)
    num_bboxes = 0
    num_segmentations = 0

    for ann in annotations:
        class_id = ann.get('class_id', '')
        class_counts[class_id] += 1

        ann_type = ann.get('type', '')
        if ann_type == 'box':
            num_bboxes += 1
            total_bboxes += 1
        elif ann_type == 'polygon':
            num_segmentations += 1
            total_segmentations += 1

    # 이미지별 통계 저장
    image_stats.append({
        '이미지 파일명': image_filename,
        '총 객체 수': num_objects,
        '바운딩 박스 수': num_bboxes,
        '세그멘테이션 수': num_segmentations,
    })

# 클래스 ID가 없는 경우 제거
class_counts = {k: v for k, v in class_counts.items() if k}

# 이미지별 통계를 DataFrame으로 변환
image_stats_df = pd.DataFrame(image_stats)

# 클래스별 객체 수 통계를 DataFrame으로 변환
class_counts_df = pd.DataFrame(list(class_counts.items()), columns=['클래스 ID', '객체 수'])
class_counts_df['비율 (%)'] = (class_counts_df['객체 수'] / class_counts_df['객체 수'].sum()) * 100

# 전체 통계 정보 계산
total_objects = class_counts_df['객체 수'].sum()
total_images = len(image_stats_df)

# 결과를 Excel 파일로 저장
with pd.ExcelWriter('dataset_statistics.xlsx') as writer:
    # 이미지별 통계 시트 저장
    image_stats_df.to_excel(writer, sheet_name='이미지별 통계', index=False)

    # 클래스별 통계 시트 저장
    class_counts_df.to_excel(writer, sheet_name='클래스별 통계', index=False)

    # 전체 통계 정보 시트 저장
    total_stats_df = pd.DataFrame({
        '항목': ['총 이미지 수', '총 객체 수', '총 바운딩 박스 수', '총 세그멘테이션 수'],
        '값': [total_images, total_objects, total_bboxes, total_segmentations]
    })
    total_stats_df.to_excel(writer, sheet_name='전체 통계', index=False)

print('데이터셋 통계가 dataset_statistics.xlsx 파일에 저장되었습니다.')
