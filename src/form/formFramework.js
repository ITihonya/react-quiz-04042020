//будет принимать конфигурацию и набор правил валидации
export function createControl(config, validation) {
    //возвращаем объект
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }

}
//функция по определению состояния параметра valid
export function validate(value, validation = null) {
    if(!validation){
        return true
    }

    let isValid = true
    if(validation.required){
        isValid = value.trim() !== '' && isValid
    }
    return isValid
}
//функция для проверки состояния формы.Если все контролы данной формы валидны,то тода вся форма является валидной
export function validateForm(formControls) {
    let isFormValid = true
    //можем пробежаться по контролам с помощью Object.keys, но сейчас сделаем через for in
    //control находится в переменной formControls
    //в control попадёт строковое значение ключа объекта formControls
    for(let control in formControls){
        /*проверяем,есть ли неунаследованные(собственные) свойства control
        (for in перебирает все свойства объекта и может зацепить прототипные,
        унаследованные...ненужные нам,поэтому мы их отсекаем с помощью hasOwnProperty) у объекта formControls
        если да то true...нет false.Так работает for in и hasOwnProperty*/
        if (formControls.hasOwnProperty(control)){
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}