from inference_sdk import InferenceHTTPClient, InferenceConfiguration

def call_crowd_recognition(image_path):
    custom_configuration = InferenceConfiguration(confidence_threshold=0, iou_threshold=0)

    CLIENT = InferenceHTTPClient(
        api_url="https://detect.roboflow.com",
        api_key="qQT7W5HhiRtUO0zFTfOb",
    )

    with CLIENT.use_configuration(custom_configuration):
        result = CLIENT.infer(image_path, model_id="crowd-density-estimation/3")

    print(result)
    return result