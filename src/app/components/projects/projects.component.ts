import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'], // Se corrigió el nombre del atributo a 'styleUrls'
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;

  constructor(private _projectService: ProjectService) {
    this.projects = [];
    this.url = Global.url;
  } // Se añadieron tipos explícitos para los parámetros

  ngOnInit() {
    this.getProjects()
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      (response: any) => { // Se añadieron tipos explícitos para la respuesta
        if(response.projects){
          this.projects = response.projects;
        }
      },
      (error: any) => { // Se añadieron tipos explícitos para el error
        console.log(error);
      }
    );
  }
}


