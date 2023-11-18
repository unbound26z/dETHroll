'use client';
import Header from 'apps/dethroll-dapp/components/Header/Header';
import InfoContent from 'apps/dethroll-dapp/components/InfoContent/InfoContent';

export default async function Index() {
  return (
    <div>
      <Header home={false} />
      <InfoContent />
    </div>
  );
}
