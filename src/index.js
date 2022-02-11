import Inputmask from 'inputmask'


var PREFIX = '[vue2-inputmask-custom-inputs]'
var ERRORS = {
  NOT_EXIST: 'Не передано значение в директиву',
  INPUTS_NOT_FOUND: 'Не найдено input[type="text"] внутри компонента'
}

function createError (e) {
  console.warn(`${PREFIX}: ${e}`)
}

function validateBindingValue (value) {
  if (!value) createError(ERRORS.NOT_EXIST)
}



var inputmaskPlugin = {
    install: function(Vue, options) {
        Vue.directive('mask', {
            bind: function(el, binding) {
              try {
                validateBindingValue(binding.value)
              
                if (el instanceof HTMLInputElement) {
                  Inputmask(binding.value).mask(el)
                  return
                }    

                // Если больше одного инпута содержится то ошибка должна быть
                var nestedInput = el.querySelectorAll('input[type="text"]')
                if (nestedInput && nestedInput.length > 1) {
                  createError('Внутри обертки должно быть не больше одного input[type="text"] элемента')
                  return
                }
                if (nestedInput && nestedInput[0] instanceof HTMLInputElement) {
                  Inputmask(binding.value).mask(nestedInput[0])
                  return
                }

                createError(ERRORS.INPUTS_NOT_FOUND)
              } catch (e) {
                createError(e)
              }
            }
        });
    }
};

exports.default = inputmaskPlugin
