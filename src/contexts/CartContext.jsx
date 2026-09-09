import { createContext, useContext, useState, useEffect } from  'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [carrinho, setCarrinho] = useState(() => {
        const salvo = localStorage.getItem('@doce-app:carrinho')
        return salvo ? JSON.parse(salvo) : []
    })

    useEffect(() => {
        localStorage.setItem('@doce-app:carrinho', JSON.stringify(carrinho))
    }, [carrinho])

    const converterPrecoParaNumero = (preco) => {
        if (typeof preco === 'number') return preco
        if (!preco) return 0
        return parseFloat(preco.toString().replace('R$', '').replace(',', '.').trim() || 0)
    }

    const adicionarAoCarrinho = (produto, quantidade = 1) => {
        setCarrinho((itensAtuais) => {
            const itemExistente = itensAtuais.find((item) => item.id === produto.id)

            if(itemExistente){
                return itensAtuais.map((item) =>
                item.id === produto.id
                ? {...item, quantidade: item.quantidade + quantidade } : item
                )
            }

            return [
                ...itensAtuais, 
                {
                    ...produto,
                    quantidade,
                    precoNumerico: converterPrecoParaNumero(produto.preco)
                },
            ]
        })
    }

    const removerDoCarrinho = (id) => {
        setCarrinho((itensAtuais) => itensAtuais.filter((item) => item.id !== id))
    }

    const atualizarQuantidade = (id, novaQuantidade) => {
        if (novaQuantidade <= 0){
            removerDoCarrinho(id)
            return
        }

        setCarrinho((itensAtuais) => 
        itensAtuais.map((item) => 
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
            )
        )
    }

    const limparCarrinho = () => {
        setCarrinho([])
    }

    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0)

    const valorTotal = carrinho.reduce((acc, item) => {
        const valorItem = item.precoNumerico || converterPrecoParaNumero(item.preco)
        return acc + valorItem * item.quantidade
    }, 0)

    return (
        <CartContext.Provider
        value={{
            carrinho,
            adicionarAoCarrinho,
            removerDoCarrinho,
            atualizarQuantidade,
            limparCarrinho,
            totalItens,
            valorTotal,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart deve ser usado dentro de um CartProvider')
    }
    return context
}