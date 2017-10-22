System.register(["../models/index", "../views/index", "../helpers/decorators/index", "../helpers/index", "../services/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, index_4, index_5, NegociacaoController, diaDaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacoesView = new index_2.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_2.MensagemView('#mensagemView');
                    this._negociacaoService = new index_5.NegociacaoService();
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona(event) {
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (this._ehDiaUtil(data)) {
                        this._mensagemView.update("Somente é permitido dias úteis para data");
                        return;
                    }
                    const negociacao = new index_1.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    index_4.imprime(...this._negociacoes.paraArray(), negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociação adicionada com sucesso!');
                }
                importa() {
                    this._negociacaoService.importaNegocicao(res => {
                        if (!res.ok) {
                            throw new Error(res.statusText);
                        }
                        return res;
                    })
                        .then(negociacoesParaImportar => {
                        const negociacoesImportadas = this._negociacoes.paraArray();
                        return negociacoesParaImportar.filter(negociacaoParaImportar => !negociacoesImportadas.some(negociacaoImportada => negociacaoParaImportar.ehIgual(negociacaoImportada)));
                    })
                        .then(negociacoes => {
                        negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                        this._negociacoesView.update(this._negociacoes);
                    })
                        .catch(error => console.log(error.message));
                }
                _ehDiaUtil(data) {
                    return data.getDay() == diaDaSemana.sabado || data.getDay() == diaDaSemana.domingo;
                }
            };
            __decorate([
                index_3.domInject("#data")
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject("#quantidade")
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject("#valor")
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "importa", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (diaDaSemana) {
                diaDaSemana[diaDaSemana["domingo"] = 0] = "domingo";
                diaDaSemana[diaDaSemana["segunda"] = 1] = "segunda";
                diaDaSemana[diaDaSemana["terca"] = 2] = "terca";
                diaDaSemana[diaDaSemana["quarta"] = 3] = "quarta";
                diaDaSemana[diaDaSemana["quinta"] = 4] = "quinta";
                diaDaSemana[diaDaSemana["sexta"] = 5] = "sexta";
                diaDaSemana[diaDaSemana["sabado"] = 6] = "sabado";
            })(diaDaSemana || (diaDaSemana = {}));
        }
    };
});
