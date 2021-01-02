import React  from 'react'
import { Panel, View } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import Desks from "../../panels/Desks/Desks"
import Columns from "../../panels/Columns/Columns"
import Context from "./context"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { panel } from "./constants"
import { useAppState } from "./hooks"
import "../../panels/Columns/Columns.css"

const App = () => {
	const state = useAppState()

	return (
		<ErrorBoundary>
			<Context.Provider value={state}>
				<View activePanel={state.activePanel} header={false}>
					<Panel id={panel.desks} separator={false}>
						<Desks />
					</Panel>

					<Panel id={panel.columns} separator={false} className="Columns">
						<Columns />
					</Panel>
				</View>
			</Context.Provider>
		</ErrorBoundary>
	)
}

export default App;
