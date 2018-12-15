import { Factory } from '../common/Factory';
import { GameObject } from './GameObject';

export class GameObjectFactory extends Factory<GameObject, typeof GameObject>{ }
