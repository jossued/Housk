import {Inject, Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {FindManyOptions} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';