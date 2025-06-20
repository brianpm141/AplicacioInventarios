// registro.component.ts
import {
  Component, Input, Output, EventEmitter,
  OnInit, OnChanges, SimpleChanges, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder,
  FormGroup, Validators
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  @Input() usuarioToEdit: any = null;
  @Output() closed  = new EventEmitter<void>();
  @Output() created = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  registroForm!: FormGroup;

  mostrarMensajeRegistro = false;
  mostrarErrorCampos    = false;

  get contraseniasCoinciden(): boolean {
    const { contrasena, confirmar } = this.registroForm.value;
    return contrasena === confirmar;
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarioToEdit']) {
      if (this.usuarioToEdit) {
        this.registroForm.patchValue({
          nombre:      this.usuarioToEdit.nombre,
          apellidos:   this.usuarioToEdit.apellidos,
          departamento:this.usuarioToEdit.departamento,
          usuario:     this.usuarioToEdit.usuario,
          rol:         this.usuarioToEdit.rol,
          contrasena:  '',
          confirmar:   ''
        });
      } else {
        this.registroForm.reset();
      }
    }
  }

  initForm() {
    this.registroForm = this.fb.group({
      nombre:      ['', Validators.required],
      apellidos:   ['', Validators.required],
      departamento:['', Validators.required],
      usuario:     ['', Validators.required],
      contrasena:  ['', Validators.required],
      confirmar:   ['', Validators.required],
      rol:         ['', Validators.required],
    });
  }

  registrarUsuario() {
    if (this.registroForm.invalid) {
      this.mostrarErrorCampos = true;
      setTimeout(() => this.mostrarErrorCampos = false, 1500);
      return;
    }
    if (!this.contraseniasCoinciden) {
      this.registroForm.get('confirmar')?.markAsTouched();
      return;
    }

    this.mostrarMensajeRegistro = true;
    setTimeout(() => {
      this.mostrarMensajeRegistro = false;
      this.created.emit(true);
      this.registroForm.reset();
      this.closed.emit();
    }, 1500);
  }

  regresar() {
    this.closed.emit();
  }
}
