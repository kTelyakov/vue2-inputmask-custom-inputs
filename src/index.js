import Inputmask from 'inputmask'

var ERRORS = {
  NOT_EXIST: 'Не передано значение в директиву',
}

function createError (e) {
  console.warn(`[vue2-inputmask-custom-inputs]: ${e}`)
}

function validateBindingValue (value) {
  if (!value) createError(ERRORS.NOT_EXIST)
}



var inputmaskPlugin = {
    install: function(Vue, options) {
        Vue.directive('mask', {
            bind: function(el, binding) {
              
                validateBindingValue(binding.value)

                if (el instanceof HTMLInputElement) {
                  Inputmask(binding.value).mask(el)
                  return
                }

                // Если больше одного инпута содержится то ошибка должна быть
                var nestedInput = el.querySelectorAll('input[type="text"]')
                if (nestedInput && nestedInput.length > 1) {
                  createError('Внутри компонента должен быть только 1 инпут')
                }
                Inputmask(binding.value).mask(nestedInput[0])
                
            }
        });
    }
};

exports.default = inputmaskPlugin