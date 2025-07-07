import { Injectable } from "@nestjs/common";
import { CustomLogger } from "../logger/custom.logger";

@Injectable()
export abstract class BaseService {

    protected readonly logger: CustomLogger;

    constructor(
    ) {
        this.logger = new CustomLogger(this.constructor.name);
    }

}