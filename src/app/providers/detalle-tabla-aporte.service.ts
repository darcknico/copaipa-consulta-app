import { Injectable } from "@angular/core";
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DetalleTablaAporte } from "../_models/tabla.aporte";
import * as moment from 'moment';

export interface CabezeraTablaAporte{
    cap_id:number;
    created_at:string;
    updated_at:string;
    total:string;
    consultas_cantidad:number;
}

@Injectable()
export class DetalleTablaAporteService {

  db: SQLiteObject = null;

  constructor() {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    let tbl_consultas_aportes = 'CREATE TABLE IF NOT EXISTS tbl_consultas_aportes('+
        'cap_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
        'created_at TEXT,'+
        'updated_at TEXT,'
        'total TEXT,'+
        'consultas_cantidad INTEGER);';
    let tbl_consulta_detalle_aporte = 'CREATE TABLE IF NOT EXISTS tbl_consulta_detalle_aporte('+
        'cda_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
        'cap_id INTEGER,'+
        'id INTEGER,'+
        'id_tarea INTEGER,'+
        'id_subtarea INTEGER,'+
        'id_subcategoria INTEGER,'+
        'tarea TEXT,'+
        'subtarea TEXT,'+
        'subcategoria TEXT,'+
        'descuento_descripcion TEXT,'+
        'cantidad INTEGER,'+
        'unidad TEXT,'+
        'descuento TEXT,'+
        'importe TEXT,'+
        'descuento_aplicado INTEGER);';
    let sql = tbl_consultas_aportes + tbl_consulta_detalle_aporte;
    return this.db.executeSql(sql, []);
  }

  create(total:number,detalles:DetalleTablaAporte[]){
    let fecha = moment();
    let sql = 'INSERT INTO tbl_consultas_aportes(created_at, updated_at,total,consultas_cantidad) VALUES(?,?,?,?);';
    return this.db.executeSql(sql,
        [
            fecha.format('YYYY-MM-DD HH:mm:ss'),
            fecha.format('YYYY-MM-DD HH:mm:ss'),
            total,
            detalles.length,
        ]).then(response=>{
            console.log("INSERT: ", response);
            let ids = response.insertId;
            let dsql = 'INSERT INTO tbl_consulta_detalle_aporte('+
                'cap_id,'+
                'id,'+
                'id_tarea,'+
                'id_subtarea,'+
                'id_subcategoria,'+
                'tarea,'+
                'subtarea,'+
                'subcategoria,'+
                'descuento_descripcion,'+
                'cantidad,'+
                'unidad,'+
                'descuento,'+
                'importe,'+
                'descuento_aplicado) VALUES';
            let values = '';
            let array_values = [];
            detalles.forEach(item=>{
                values += '(?,?,?,?,?,?,?,?,?,?,?,?,?,?),';
                array_values.push(ids);
                array_values.push(item.id);
                array_values.push(item.id_tarea);
                array_values.push(item.id_subtarea);
                array_values.push(item.id_subcategoria);
                array_values.push(item.tarea);
                array_values.push(item.subtarea);
                array_values.push(item.subcategoria);
                array_values.push(item.descuento_descripcion);
                array_values.push(item.cantidad);
                array_values.push(item.unidad);
                array_values.push(item.descuento);
                array_values.push(item.importe);
                array_values.push(item.descuento_aplicado);
            });
            values.slice(0,-1);
            return this.db.executeSql(dsql+values,array_values);
        });
  }

  getAll():Promise<CabezeraTablaAporte[]>{
    let sql = 'SELECT * FROM tbl_consultas_aportes';
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks:CabezeraTablaAporte[] = [];
      for (let index = 0; index < response.rows.length; index++) {
        let current = response.rows.item(index);
        let item =<CabezeraTablaAporte>{};
        item.cap_id = current.cap_id;
        item.created_at = current.created_at;
        item.updated_at = current.updated_at;
        item.total = current.total;
        item.consultas_cantidad = current.consultas_cantidad;
        tasks.push( item );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }

  update(cabezera:CabezeraTablaAporte,detalles:DetalleTablaAporte[]){
    let fecha = moment();
    let sql = 'UPDATE tbl_consultas_aportes SET updated_at=?, total=?, consultas_cantidad =? WHERE cap_id=?';
    return this.db.executeSql(sql, [
        fecha.format('YYYY-MM-DD HH:mm:ss'),
        cabezera.total, 
        cabezera.consultas_cantidad,
        ]).then(response=>{
            let tasks = [];
            detalles.forEach(item=>{
                if(item.cda_id>0){
                    let dsql = 'UPDATE tbl_consulta_detalle_aporte SET'+
                        'id_tarea=?,'+
                        'id_subtarea=?,'+
                        'id_subcategoria=?,'+
                        'tarea=?,'+
                        'subtarea=?,'+
                        'subcategoria=?,'+
                        'descuento_descripcion=?,'+
                        'cantidad=?,'+
                        'unidad=?,'+
                        'descuento=?,'+
                        'importe=?,'+
                        'descuento_aplicado=? where cda_id = ?';
                    tasks.push(
                        this.db.executeSql(dsql,[
                            item.id_tarea,
                            item.id_subtarea,
                            item.id_subcategoria,
                            item.tarea,
                            item.subtarea,
                            item.subcategoria,
                            item.descuento_descripcion,
                            item.cantidad,
                            item.unidad,
                            item.descuento,
                            item.importe,
                            item.descuento_aplicado,
                            item.cda_id,
                        ])
                    );
                } else {
                    let dsql = 'INSERT INTO tbl_consulta_detalle_aporte('+
                        'cap_id,'+
                        'id,'+
                        'id_tarea,'+
                        'id_subtarea,'+
                        'id_subcategoria,'+
                        'tarea,'+
                        'subtarea,'+
                        'subcategoria,'+
                        'descuento_descripcion,'+
                        'cantidad,'+
                        'unidad,'+
                        'descuento,'+
                        'importe,'+
                        'descuento_aplicado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                    tasks.push(
                        this.db.executeSql(dsql,[
                            cabezera.cap_id,
                            item.id,
                            item.id_tarea,
                            item.id_subtarea,
                            item.id_subcategoria,
                            item.tarea,
                            item.subtarea,
                            item.subcategoria,
                            item.descuento_descripcion,
                            item.cantidad,
                            item.unidad,
                            item.descuento,
                            item.importe,
                            item.descuento_aplicado,
                        ])
                    );
                }
            });
            return Promise.all(tasks);
        });
  }

  getById(id:number):Promise<DetalleTablaAporte[]>{
    let sql = 'SELECT * FROM tbl_consulta_detalle_aporte WHERE cap_id=? ORDER BY cda_id desc';
    return this.db.executeSql(sql, [id])
    .then(response => {
      let tasks:DetalleTablaAporte[] = [];
      for (let index = 0; index < response.rows.length; index++) {
        let current = response.rows.item(index);
        let item =<DetalleTablaAporte>{};
        item.cap_id = current.cap_id;
        item.id = current.id;
        item.id_tarea = current.id_tarea;
        item.id_subtarea = current.id_subtarea;
        item.id_subcategoria = current.id_subcategoria;
        item.tarea = current.tarea;
        item.subtarea = current.subtarea;
        item.subcategoria = current.subcategoria;
        item.descuento_descripcion = current.descuento_descripcion;
        item.cantidad = current.cantidad;
        item.unidad = current.unidad;
        item.descuento = current.descuento;
        item.importe = current.importe;
        item.descuento_aplicado = current.descuento_aplicado;
        tasks.push( item );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }

  delete(id){
    let sql = 'DELETE FROM tbl_consultas_aportes WHERE cap_id=?;DELETE FROM tbl_consulta_detalle_aporte WHERE cap_id=?;';
    return this.db.executeSql(sql, [id,id]);
  }

}