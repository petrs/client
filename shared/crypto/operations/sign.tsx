import * as React from 'react'
import * as Container from '../../util/container'
import * as Constants from '../../constants/crypto'
import * as Kb from '../../common-adapters'
import openURL from '../../util/open-url'
import {Input, DragAndDrop, OperationBanner} from '../input'
import OperationOutput, {OutputBar, OutputInfoBanner, SignedSender, OutputProgress} from '../output'

const SignOutputBanner = () => {
  const outputType = Container.useSelector(state => state.crypto.sign.outputType)
  return (
    <OutputInfoBanner operation={Constants.Operations.Sign}>
      <Kb.Text type="BodySmallSemibold" center={true}>
        This is your signed {outputType === 'file' ? 'file' : 'message'}, using{` `}
        <Kb.Text
          type="BodySecondaryLink"
          underline={true}
          onClick={() => openURL(Constants.saltpackDocumentation)}
        >
          Saltpack
        </Kb.Text>
        .{` `}Anyone who has it can verify you signed it.
      </Kb.Text>
    </OutputInfoBanner>
  )
}

const Sign = () => {
  const [fileDroppedCounter, setFileDroppedCounter] = React.useState(0)
  return (
    <DragAndDrop
      operation={Constants.Operations.Sign}
      prompt="Drop a file to sign"
      onClearInput={() => setFileDroppedCounter(prevCount => prevCount + 1)}
    >
      <Kb.Box2 direction="vertical" fullHeight={true}>
        <OperationBanner
          operation={Constants.Operations.Sign}
          infoMessage="Add your cryptographic signature to a message or file."
        />
        <Input operation={Constants.Operations.Sign} fileDroppedCounter={fileDroppedCounter} />
        <OutputProgress operation={Constants.Operations.Sign} />
        <Kb.Box2 direction="vertical" fullHeight={true}>
          <SignOutputBanner />
          <SignedSender operation={Constants.Operations.Sign} />
          <OperationOutput operation={Constants.Operations.Sign} />
          <OutputBar operation={Constants.Operations.Sign} />
        </Kb.Box2>
      </Kb.Box2>
    </DragAndDrop>
  )
}

export default Sign
