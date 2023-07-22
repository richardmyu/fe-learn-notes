import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('../combination/index'));
const AnotherComponent = React.lazy(() => import('../combination/name-slot'));

function MyComponent() {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<section>
					<OtherComponent />
					<AnotherComponent />
				</section>
			</Suspense>
		</div>
	);
}

export default MyComponent
