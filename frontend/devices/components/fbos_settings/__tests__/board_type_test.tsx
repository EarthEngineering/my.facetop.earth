jest.mock("../../../../api/crud", () => ({
  edit: jest.fn(),
  save: jest.fn(),
}));

import * as React from "react";
import { mount, shallow } from "enzyme";
import { BoardType } from "../board_type";
import { BoardTypeProps } from "../interfaces";
import { fakeState } from "../../../../__test_support__/fake_state";
import {
  fakeFbosConfig,
} from "../../../../__test_support__/fake_state/resources";
import {
  buildResourceIndex,
} from "../../../../__test_support__/resource_index_builder";
import { edit, save } from "../../../../api/crud";
import { bot } from "../../../../__test_support__/fake_state/bot";
import {
  fakeTimeSettings,
} from "../../../../__test_support__/fake_time_settings";

describe("<BoardType/>", () => {
  const fakeConfig = fakeFbosConfig();
  const state = fakeState();
  state.resources = buildResourceIndex([fakeConfig]);

  const fakeProps = (): BoardTypeProps => ({
    bot,
    alerts: [],
    dispatch: jest.fn(x => x(jest.fn(), () => state)),
    sourceFbosConfig: () => ({ value: true, consistent: true }),
    shouldDisplay: () => false,
    botOnline: true,
    timeSettings: fakeTimeSettings(),
    firmwareHardware: undefined,
  });

  it("renders with valid firmwareHardware", () => {
    const p = fakeProps();
    p.firmwareHardware = "farmduino";
    const wrapper = mount(<BoardType {...p} />);
    expect(wrapper.text()).toContain("Farmduino");
  });

  it("sets sending status", () => {
    const wrapper = mount<BoardType>(<BoardType {...fakeProps()} />);
    expect(wrapper.state().sending).toBeFalsy();
    const p = fakeProps();
    p.sourceFbosConfig = () => ({ value: true, consistent: false });
    wrapper.setProps(p);
    wrapper.mount();
    expect(wrapper.state().sending).toBeTruthy();
  });

  it("calls updateConfig", () => {
    const p = fakeProps();
    const wrapper = mount<BoardType>(<BoardType {...p} />);
    const selection =
      shallow(<div>{wrapper.instance().FirmwareSelection()}</div>);
    selection.find("FBSelect").simulate("change",
      { label: "firmware_hardware", value: "farmduino" });
    expect(edit).toHaveBeenCalledWith(fakeConfig, {
      firmware_hardware: "farmduino"
    });
    expect(save).toHaveBeenCalledWith(fakeConfig.uuid);
  });

  it("doesn't call updateConfig", () => {
    const p = fakeProps();
    const wrapper = mount<BoardType>(<BoardType {...p} />);
    const selection =
      shallow(<div>{wrapper.instance().FirmwareSelection()}</div>);
    selection.find("FBSelect").simulate("change",
      { label: "firmware_hardware", value: "unknown" });
    expect(edit).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
  });

  it("displays standard boards", () => {
    const wrapper = mount(<BoardType {...fakeProps()} />);
    const { list } = wrapper.find("FBSelect").props();
    expect(list).toEqual([
      { label: "Arduino/RAMPS (Genesis v1.2)", value: "arduino" },
      { label: "Farmduino (Genesis v1.3)", value: "farmduino" },
      { label: "Farmduino (Genesis v1.4)", value: "farmduino_k14" },
      { label: "Farmduino (Genesis v1.5)", value: "farmduino_k15" },
      { label: "Farmduino (Express v1.0)", value: "express_k10" },
      { label: "None", value: "none" },
    ]);
  });

  it("displays new boards", () => {
    const p = fakeProps();
    p.shouldDisplay = () => true;
    const wrapper = mount(<BoardType {...p} />);
    const { list } = wrapper.find("FBSelect").props();
    expect(list).toEqual([
      { label: "Arduino/RAMPS (Genesis v1.2)", value: "arduino" },
      { label: "Farmduino (Genesis v1.3)", value: "farmduino" },
      { label: "Farmduino (Genesis v1.4)", value: "farmduino_k14" },
      { label: "Farmduino (Genesis v1.5)", value: "farmduino_k15" },
      { label: "Farmduino (Express v1.0)", value: "express_k10" },
      { label: "None", value: "none" },
    ]);
  });
});
