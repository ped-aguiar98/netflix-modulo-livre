
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import { goToBillingPortal } from '../lib/stripe'
import Loader from './Loader'

function Membership() {
  const { user } = useAuth()
  const subscription = useSubscription(user)
  const [isBillingLoading, setBillingLoading] = useState(false)

  const manageSubscription = () => {
    if (subscription) {
      setBillingLoading(true)
      goToBillingPortal()
    }
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 text-black">
      <div className="space-y-2 py-4">
        <h4 className="text-lg text-[gray]">Assinatura e Cobrança</h4>
        <button
          disabled={isBillingLoading || !subscription}
          className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
          onClick={manageSubscription}
        >
          {isBillingLoading ? (
            <Loader color="dark:fill-[#e50914]" />
          ) : (
            'Cancelar Assinatura'
          )}
        </button>
      </div>

      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-[gray]">Senha: *********</p>
          </div>
          <div className="md:text-right">
            <p className="membershipLink">Alterar email da conta</p>
            <p className="membershipLink">Alterar senha</p>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
          <div>
            <p className=''>
              {subscription?.cancel_at_period_end
                ? 'Sua assinatura irá acabar em '
                : 'Sua próxima data de cobrança é '}
              {subscription?.current_period_end}
            </p>
          </div>
          <div className="md:text-right">
            <p className="membershipLink">Gerenciar informações da pagamente</p>
            <p className="membershipLink">Forma de pagamento alternativa</p>
            <p className="membershipLink">Detalhes da cobrança</p>
            <p className="membershipLink">Alterar data da cobrança</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Membership