import torch
import torch.nn as nn
import yaml

def get_model(cfg_path):
    """
    Load model architecture from a YAML configuration file.
    
    Args:
        cfg_path (str): Path to the YAML configuration file.
        
    Returns:
        model (torch.nn.Module): Initialized model.
    """
    with open(cfg_path, 'r') as f:
        cfg = yaml.safe_load(f)
    
    # Example architecture: simple CNN for demonstration
    layers = []
    input_channels = cfg['input_channels']
    
    for layer_cfg in cfg['layers']:
        if layer_cfg['type'] == 'conv':
            layers.append(
                nn.Conv2d(
                    in_channels=input_channels,
                    out_channels=layer_cfg['out_channels'],
                    kernel_size=layer_cfg['kernel_size'],
                    stride=layer_cfg['stride'],
                    padding=layer_cfg['padding']
                )
            )
            layers.append(nn.ReLU())
            input_channels = layer_cfg['out_channels']
        elif layer_cfg['type'] == 'pool':
            layers.append(
                nn.MaxPool2d(
                    kernel_size=layer_cfg['kernel_size'],
                    stride=layer_cfg['stride'],
                    padding=layer_cfg['padding']
                )
            )
        elif layer_cfg['type'] == 'fc':
            layers.append(
                nn.Linear(
                    in_features=layer_cfg['in_features'],
                    out_features=layer_cfg['out_features']
                )
            )
            layers.append(nn.ReLU())

    # Add a final fully connected layer for classification
    layers.append(nn.Flatten())
    layers.append(nn.Linear(cfg['final_fc']['in_features'], cfg['final_fc']['out_features']))
    
    model = nn.Sequential(*layers)
    return model

# Example YAML configuration for the model (cfg_path):
"""
input_channels: 3
layers:
  - type: conv
    out_channels: 32
    kernel_size: 3
    stride: 1
    padding: 1
  - type: pool
    kernel_size: 2
    stride: 2
    padding: 0
  - type: conv
    out_channels: 64
    kernel_size: 3
    stride: 1
    padding: 1
  - type: pool
    kernel_size: 2
    stride: 2
    padding: 0
  - type: fc
    in_features: 4096
    out_features: 512
final_fc:
  in_features: 512
  out_features: 10
"""
