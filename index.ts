import { copyFile, cpSync } from "fs"

const fs = require('fs')

const leituraDeArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'))
}

const escritaDeArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados))

}

type Endereco = {
    cep: string
    rua: string
    complemento?: string
    bairro: string
    cidade: string
}

type Usuario = {
    nome: string
    email: string
    cpf: string
    profissao?: string
    endereco: Endereco | null
}


const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = leituraDeArquivo() as Usuario[]
    bd.push(dados)
    escritaDeArquivo(bd)
    return dados
}

const listarUsuario = (): Usuario[] => {
    return leituraDeArquivo() as Usuario[]
}

const detalharUsuario = (cpf: string): Usuario => {
    const bd = leituraDeArquivo() as Usuario[]
    const usuario = bd.find(campo => {
        return campo.cpf === cpf
    })
    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }
    return usuario
}


const atualizarUsuario = (cpf: string, dados: Usuario) => {
    const bd = leituraDeArquivo() as Usuario[]
    let usuario = bd.find(campo => {
        return campo.cpf === cpf
    })
    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }

    usuario.nome = dados.nome
    usuario.email = dados.email
    usuario.cpf = dados.cpf
    usuario.profissao = dados.profissao
    usuario.endereco = dados.endereco

    escritaDeArquivo(bd)
    return usuario
}

const excluirUsuario = (cpf: string): Usuario => {

    const bd = leituraDeArquivo() as Usuario[]
    const usuario = bd.find(campo => {
        return campo.cpf === cpf
    })
    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }

    const excluir = bd.filter(campo => {
        return campo.cpf !== cpf
    })
    escritaDeArquivo(excluir)

    return usuario

}
const filtrarUsuario = (profissao?: string): Usuario[] => {
    const bd = leituraDeArquivo() as Usuario[]
    const usuario = bd.filter(campo => {
        if (profissao) {
            return campo.profissao === profissao
        }

        return campo
    })

    return usuario
}
