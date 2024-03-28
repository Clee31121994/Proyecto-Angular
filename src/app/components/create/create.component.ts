import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { ViewChild } from '@angular/core'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project: any;
  public status: string = '';
  public filesToUpload: Array<File> = [];
  public url: string = Global.url; // Inicializa la propiedad url con Global.url

  @ViewChild('projectForm') projectForm: any;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = "Crear proyecto";
    this.project = new Project('','','','',2024,'','');
   }

  ngOnInit(): void {
    
  }

  
  onSubmit() {
    // Guardar datos básicos
    this._projectService.saveProject(this.project).subscribe(
      (response: any) => {
        if(response.project) {
          // Subir la imagen
          this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              this.save_project = response.project;
              this.status = 'success';
              // Resetear el formulario utilizando la referencia #projectForm
              this.projectForm.resetForm();
            });
        } else {
          this.status = 'failed';
        } 
      },error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}




