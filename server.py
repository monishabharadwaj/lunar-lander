from flask import Flask, jsonify, request
from flask_cors import CORS
import gymnasium as gym
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variables to maintain game state
env = None
current_state = None

def reset_environment():
    global env, current_state
    if env is None:
        env = gym.make('LunarLander-v3', render_mode='rgb_array')
    current_state, _ = env.reset()
    return get_game_state()

def get_game_state():
    # State contains: [x, y, vx, vy, angle, angular_velocity, left_leg_contact, right_leg_contact]
    global current_state
    if current_state is None:
        return reset_environment()
    
    return {
        'x': float(current_state[0]),
        'y': float(current_state[1]),
        'velocity_x': float(current_state[2]),
        'velocity_y': float(current_state[3]),
        'angle': float(current_state[4]),
        'angular_velocity': float(current_state[5]),
        'left_leg_contact': bool(current_state[6]),
        'right_leg_contact': bool(current_state[7]),
        'frame': env.render().tolist()
    }

@app.route('/api/reset', methods=['POST'])
def reset():
    return jsonify(reset_environment())

@app.route('/api/state', methods=['GET'])
def state():
    return jsonify(get_game_state())

@app.route('/api/action', methods=['POST'])
def action():
    global current_state
    action = request.json.get('action')
    
    if action is None:
        return jsonify({'error': 'No action provided'}), 400
    
    current_state, reward, terminated, truncated, _ = env.step(action)
    
    response = get_game_state()
    response.update({
        'reward': float(reward),
        'terminated': terminated,
        'truncated': truncated
    })
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5000) 