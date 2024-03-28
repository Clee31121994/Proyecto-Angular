import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project?: Project;
  public confirm: boolean = false; // Definimos la propiedad confirm como un booleano inicializado en false
  public id: any;
  

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getProject(this.id);
    });
  }

  getProject(id: any): void {
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

  deleteProject(id: any): void {
    this._projectService.deleteProject(id).subscribe(
      response => {
        if (response.project) {
          this._router.navigate(['/proyectos']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setConfirm(value: boolean): void {
    this.confirm = value; // Definimos el método setConfirm para cambiar el valor de la propiedad confirm
  }
}







