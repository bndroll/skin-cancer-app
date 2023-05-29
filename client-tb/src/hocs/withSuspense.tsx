import React, { Suspense } from 'react';


export function withSuspense<WCP extends object>(WrappedComponent: React.ComponentType<WCP>) {
	return (props: WCP) => {
		return (
			<Suspense fallback={<div>Идет загрузка...</div>}>
				<WrappedComponent {...props} />
			</Suspense>
		);
	};
}