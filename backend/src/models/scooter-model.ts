import { CreateScooterModelModelDto } from "../dto/create-scooter-model-model";
import { ValidationError } from "../errors/validation";
import { BaseModel } from "./base";
import { ScooterManufacturerId } from "./scooter-manufacturer";

type ScooterModelId = string & { _opaque: "ScooterModel" };

class ScooterModel extends BaseModel<ScooterModelId> {
  private _title: string;
  private _singleChargeMileage: number;
  private _weight: number;
  private _maxSpeed: number;
  private _maxLoad: number;
  private _year: number;
  private _manufacturerId: ScooterManufacturerId;

  public constructor(dto: CreateScooterModelModelDto) {
    super(dto.id);

    this._title = dto.title;
    this._maxLoad = dto.maxLoad;
    this._weight = dto.weight;
    this._singleChargeMileage = dto.singleChargeMileage;
    this._maxSpeed = dto.maxSpeed;
    this._manufacturerId = dto.manufacturerId;
    this._year = dto.year;
  }

  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get singleChargeMileage() {
    return this._singleChargeMileage;
  }

  public set singleChargeMileage(value: number) {
    if (value <= 0) {
      throw new ValidationError(
        "Пробег на одном заряде не может быть отрицательным или равным нулю"
      );
    }

    this._singleChargeMileage = value;
  }

  public get weight() {
    return this._weight;
  }

  public set weight(value: number) {
    if (value <= 0) {
      throw new ValidationError(
        "Масса не может быть отрицательной или равной нулю"
      );
    }

    this._weight = value;
  }

  public get maxSpeed() {
    return this._maxSpeed;
  }

  public set maxSpeed(value: number) {
    if (value <= 0) {
      throw new ValidationError(
        "Максимальная скорость не может быть отрицательной или равной нулю"
      );
    }

    this._maxSpeed = value;
  }

  public get maxLoad() {
    return this._maxLoad;
  }

  public set maxLoad(value: number) {
    if (value <= 0) {
      throw new ValidationError(
        "Максимальная нагрузка не может быть отрицательной или равной нулю"
      );
    }

    this._maxLoad = value;
  }

  public set manufacturerId(value: ScooterManufacturerId) {
    this._manufacturerId = value;
  }

  public get manufacturerId() {
    return this._manufacturerId;
  }

  public get year() {
    return this._year;
  }

  public set year(value: number) {
    this._year = value;
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      title: this.title,
      singleChargeMileage: this.singleChargeMileage,
      weight: this.weight,
      maxSpeed: this.maxSpeed,
      maxLoad: this.maxLoad,
      year: this.year,
      manufacturerId: this.manufacturerId,
    };
  }
}

export { ScooterModel, ScooterModelId };
