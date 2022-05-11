import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {

  funcionarios : Funcionario[] = []

  columns: string[] = ['nome', 'email', 'cargo', 'salario', 'acoes']
  carregando = false

  constructor(
    private funcService: FuncionarioService
  ) { }

  ngOnInit(): void {
    this.listarFuncionarios()
  }

  listarFuncionarios(){
    this.funcService.listarFuncionarios().subscribe(doc =>{
      this.funcionarios = []
      doc.forEach((element:any) => {
        this.funcionarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()})
      });
    })
    console.log(this.funcionarios)
  }

  excluirFuncionario(id:string){
    this.funcService.excluirFuncionario(id).then(() => {
      console.log("Funcionario Excluido")
    }, error => {
      console.log("Erro ao excluir um funcionario" + error)
    })
  }

 editarFuncionario(funcionario:Funcionario){
    this.funcService.pegarDadosDoFcunionarioEscolhido(funcionario)
 }

}
