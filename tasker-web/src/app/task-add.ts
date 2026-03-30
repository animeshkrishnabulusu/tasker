import { Component, EventEmitter, Output } from "@angular/core";                          
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"; 
                                                                                          
@Component({                                                                              
    selector: 'task-add',                                                                 
    standalone: true,                                                                     
    imports: [ReactiveFormsModule],                                                       
    template: `                                                                           
    <div style="margin: 2rem 0;">                                                         
        <form [formGroup]="form" (ngSubmit)="submit()">                                   
            <input type="text" formControlName="title" placeholder="Add your next big     
task"/>                                                                                   
            <button type="submit" [disabled]="form.invalid">Add</button>                  
            @if (title.invalid && title.touched) {<div style="font-size: 0.75rem">Title is
required (between 10 and 50 chars)</div>}                                                 
        </form>                                                                           
    </div>`                                                                               
})                                                                                        
                                                                                          
export class TaskAddComponent {                                                           
    @Output() addTask = new EventEmitter<string>();                                       
                                                                                          
    form = new FormGroup({                                                                
        title: new FormControl('', {                                                      
            nonNullable: true,                                                            
            validators: [Validators.required, Validators.minLength(10),                   
Validators.maxLength(50)]                                                                 
        })                                                                                
    });                                                                                   
                                                                                          
    get title() {                                                                         
        return this.form.controls.title;                                                  
    }                                                                                     
                                                                                          
    submit() {                                                                            
        if (this.form.invalid) return;                                                    
                                                                                          
        this.addTask.emit(this.title.value);                                              
        this.title.disable();                                                             
                                                                                          
        this.form.reset({ title: '' });                                                   
    }                                                                                     
}