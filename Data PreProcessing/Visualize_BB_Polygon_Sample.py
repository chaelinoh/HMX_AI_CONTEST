import cv2
import matplotlib.pyplot as plt
import numpy as np


def draw_annotations(image_path, bbox_annotation_file, seg_annotation_file):
    # Load the image
    img = cv2.imread(image_path)
    height, width, _ = img.shape

    # Read the bounding box annotation file
    with open(bbox_annotation_file, 'r') as f:
        bbox_annotations = f.readlines()

    # Read the segmentation annotation file
    with open(seg_annotation_file, 'r') as f:
        seg_annotations = f.readlines()

    # Draw bounding boxes
    for ann in bbox_annotations:
        values = ann.strip().split()
        class_id = values[0]
        x_center, y_center, bbox_width, bbox_height = map(float, values[1:])
        x_center *= width
        y_center *= height
        bbox_width *= width
        bbox_height *= height

        # Calculate top-left and bottom-right corners of the bounding box
        x_min = int(x_center - bbox_width / 2)
        y_min = int(y_center - bbox_height / 2)
        x_max = int(x_center + bbox_width / 2)
        y_max = int(y_center + bbox_height / 2)

        # Draw the bounding box
        cv2.rectangle(img, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
        cv2.putText(img, f"{class_id}", (x_min, y_min - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    # Draw polygons (segmentation)
    for ann in seg_annotations:
        values = ann.strip().split()
        class_id = values[0]
        points = [(float(values[i]) * width, float(values[i + 1]) * height) for i in range(1, len(values), 2)]
        points = [(int(x), int(y)) for x, y in points]

        # Draw the polygon
        points = np.array(points, np.int32)
        points = points.reshape((-1, 1, 2))
        cv2.polylines(img, [points], isClosed=True, color=(0, 0, 255), thickness=2)
        cv2.putText(img, f"{class_id}", (points[0][0][0], points[0][0][1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6,
                    (0, 0, 255), 2)

    # Display the image with bounding boxes and polygons
    plt.figure(figsize=(10, 10))
    plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    plt.axis('off')
    plt.show()


# Example usage
image_path = 'SampleFile/L-210916_G03_D_WS-09_001_0001.jpg'  # Replace with the actual image file path
bbox_annotation_file = 'bounding_box_annotations/L-210916_G03_D_WS-09_001_0001.txt'  # Bounding box .txt file path
seg_annotation_file = 'segmentation_annotations/L-210916_G03_D_WS-09_001_0001.txt'  # Segmentation .txt file path

draw_annotations(image_path, bbox_annotation_file, seg_annotation_file)
