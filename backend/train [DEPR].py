import argparse
import re
import os
import yaml
from pathlib import Path
import torch
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
import torch.optim as optim
import torch.nn as nn
from model_utils import get_model  # Ensure this imports correctly

print(torch.__version__)

def select_device(device='cpu'):
    if device == 'cpu':
        return torch.device('cpu')
    elif device.startswith('cuda'):
        if torch.cuda.is_available():
            return torch.device(device)
        else:
            print("CUDA device is not available. Switching to CPU.")
            return torch.device('cpu')
    else:
        raise ValueError(f"Unknown device: {device}. Choose 'cpu' or 'cuda'.")

def increment_path(path, increment=10):
    dir_name, file_name = os.path.split(path)
    base_name, ext = os.path.splitext(file_name)
    
    match = re.search(r'(\d+)$', base_name)
    
    if match:
        num = int(match.group(1))
        new_num = num + increment
        new_base_name = re.sub(r'(\d+)$', f'{new_num:04}', base_name)
    else:
        new_base_name = f'{base_name}_000{increment}'
    
    new_file_name = f'{new_base_name}{ext}'
    new_path = os.path.join(dir_name, new_file_name)
    
    return new_path

def train(model, train_loader, criterion, optimizer, device, num_epochs):
    model.to(device)
    model.train()
    
    for epoch in range(num_epochs):
        running_loss = 0.0
        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            
            optimizer.zero_grad()
            
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
        
        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader)}')

def main(opt):
    save_dir = increment_path(Path(opt.project) / opt.name)
    print(f'Saving results to: {save_dir}')

    device = select_device(opt.device)

    with open(opt.data, 'r') as f:
        data_config = yaml.safe_load(f)
    
    transform = transforms.Compose([
        transforms.Resize((opt.img_size, opt.img_size)),
        transforms.ToTensor()
    ])
    
    train_dataset = datasets.ImageFolder(data_config['train'], transform=transform)
    train_loader = DataLoader(train_dataset, batch_size=opt.batch_size, shuffle=True)

    model = get_model(opt.cfg)  # Initialize your model here
    if opt.weights:
        model.load_state_dict(torch.load(opt.weights, map_location=device))

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)
    num_epochs = opt.epochs

    train(model, train_loader, criterion, optimizer, device, num_epochs)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Train a model.')
    parser.add_argument('--weights', type=str, default='yolov5s.pt', help='Initial weights path')
    parser.add_argument('--cfg', type=str, default='', help='Model configuration file')
    parser.add_argument('--data', type=str, default='data.yaml', help='Data configuration file')
    parser.add_argument('--img-size', type=int, default=640, help='Image size (pixels)')
    parser.add_argument('--batch-size', type=int, default=16, help='Batch size')
    parser.add_argument('--epochs', type=int, default=50, help='Number of epochs')
    parser.add_argument('--device', type=str, default='cpu', help='Device to use for training (e.g., 0 or cpu)')
    parser.add_argument('--project', type=str, default='runs/train', help='Project directory')
    parser.add_argument('--name', type=str, default='exp', help='Name of the experiment')
    parser.add_argument('--exist-ok', action='store_true', help='Overwrite existing experiment')

    opt = parser.parse_args()
    main(opt)
