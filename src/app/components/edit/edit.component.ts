/*import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html', // Usa la misma plantilla que create.component.html
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project; // Inicializa la propiedad project
  public save_project: any;
  public status: string = '';
  public filesToUpload: Array<File> = [];
  public id: string; // Declara la propiedad id
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = "Editar proyecto";
    this.id = '';
    this.project = new Project(); // Asigna una nueva instancia de Project
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getProject(this.id);
    });
  }

  getProject(id: string): void {
    this._projectService.getProject(id).subscribe(
      (response: any) => {
        if (response && response.project) {
          this.project = response.project;
        } else {
          console.error('No se recibió un proyecto válido en la respuesta.');
        }
      },
      (error: any) => {
        console.error('Ocurrió un error al obtener el proyecto:', error);
      }
    );
  }

  onSubmit(): void {
    this._projectService.updateProject(this.project).subscribe(
      (response: any) => {
        if(response.project){

          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              this.save_project = result.project;
              this.status = 'success';
            });
          }else{
            this.save_project = response.project;
            this.status = 'success';
          }    
          
        }else{
          this.status = 'failed';
        } 
      },
      (error: any) => {
        console.error('Ocurrió un error al obtener el proyecto:', error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  @ViewChild('projectForm') projectForm!: NgForm;

  public title: string;
  public project: Project;
  public save_project: any;
  public status: string = '';
  public filesToUpload: Array<File> = [];
  public id: string;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = "Editar proyecto";
    this.id = '';
    this.project = new Project();
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getProject(this.id);
    });
  }

  getProject(id: string): void {
    this._projectService.getProject(id).subscribe(
      (response: any) => {
        if (response && response.project) {
          this.project = response.project;
        } else {
          console.error('No se recibió un proyecto válido en la respuesta.');
        }
      },
      (error: any) => {
        console.error('Ocurrió un error al obtener el proyecto:', error);
      }
    );
  }

  onSubmit(): void {
    // Asignar los valores editados al objeto project
    this.project.name = this.projectForm.value.name;
    this.project.description = this.projectForm.value.description;
    this.project.year = this.projectForm.value.year;
    this.project.langs = this.projectForm.value.langs;
    this.project.category = this.projectForm.value.category;

    this._projectService.updateProject(this.project).subscribe(
      (response: any) => {
        if (response.project) {
          this.save_project = response.project;
          this.status = 'success';

          if (this.filesToUpload.length > 0) {
            this.uploadFiles();
          }
        } else {
          this.status = 'failed';
        }
      },
      (error: any) => {
        console.error('Ocurrió un error al actualizar el proyecto:', error);
        this.status = 'failed';
      }
    );
  }

  uploadFiles(): void {
    this._uploadService.makeFileRequest(Global.url + "upload-image/" + this.save_project._id, [], this.filesToUpload, 'image')
      .then((result: any) => {
        console.log('Archivos cargados:', result);
      })
      .catch((error: any) => {
        console.error('Ocurrió un error al cargar los archivos:', error);
      });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}







