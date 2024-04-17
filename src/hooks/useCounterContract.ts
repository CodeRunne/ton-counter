import { useEffect, useState } from 'react';
import { Counter } from '../contracts/counter';
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract } from '@ton/core';

export function useCounterContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();
  const [val, setVal] = useState<null | string>();
  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse('EQC8rvK2DSrqqM8vGcSP0ww4kh2XhzRVFpAYi3JAlgFClSU7') // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      setVal(null);
      const val = await counterContract.getCounter();
      setVal(val.toString());
      await sleep(5000);
      getValue();
    }
    getValue();
  }, [counterContract]);

  return {
    value: val,
    address: counterContract?.address.toString(),
    sendIncrement: () => {
        return counterContract?.sendIncrement(sender);
      },
  };
}