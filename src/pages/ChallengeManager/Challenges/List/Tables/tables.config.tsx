import { TableProps, Avatar, Tag, Tooltip } from "antd";
import IDataTypeChallengeList from "./tables.type";
import { convertTimestampToVietnamTime } from "../../../../../utils/convertTime";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ViewChallengers } from "./Partials/ViewChallengers";

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const challengeListColumn: TableProps<IDataTypeChallengeList>["columns"] = [
  {
    width: 100,
    fixed: "left",
    title: "STT",
    key: "stt",
    render: (_, __, index) => index + 1,
  },
  {
    width: 180,
    fixed: "left",
    title: "Title",
    key: "title",
    sorter: (a, b) => a.title?.length - b.title?.length,
    dataIndex: "title",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Công nghệ",
    key: "technical",
    width: 200,
    dataIndex: "technical",
    render: (technicalList: IDataTypeChallengeList["technical"]) => {
      const [firstTechnical, secondTechinical, ...rest] = technicalList;
      const technicalShow = [firstTechnical, secondTechinical];

      return (
        <div className="technical-challenge">
          {technicalShow.map((technical, index) => (
            <Tag
              color="cyan"
              style={{ textTransform: "capitalize" }}
              key={`${technical}-${index}`}
            >
              {technical}
            </Tag>
          ))}
          {rest.length > 0 && <Tag color="red">+ {rest.length}</Tag>}
        </div>
      );
    },
  },
  {
    title: "Cấp độ",
    width: 124,
    key: "level",
    dataIndex: "level",
    render: (level: string) => level,
  },
  {
    width: 100,
    title: <div style={{ textAlign: "center" }}>Số điểm</div>,
    key: "point",
    dataIndex: "point",
    render: (point: string) => (
      <div style={{ textAlign: "center" }}>{point}</div>
    ),
  },
  {
    width: 100,
    title: <div style={{ textAlign: "center" }}>Premium</div>,
    key: "premium",
    dataIndex: "premium",
    render(isPremium: boolean) {
      return isPremium ? (
        <div style={{ textAlign: "center" }}>
          {<CheckOutlined style={{ color: "#5250F7" }} />}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>{<CloseOutlined />}</div>
      );
    },
  },
  {
    title: () => <div style={{ textAlign: "center" }}>Tham gia</div>,
    width: 120,
    key: "joinTotal",
    dataIndex: "joinTotal",
    sorter: (a, b) => a.joinTotal - b.joinTotal,
    render: (joinTotal: string | number, record) => (
      <ViewChallengers
        typeChallengerInChallenge="all"
        challengeId={record.id}
        value={joinTotal}
      />
    ),
  },
  {
    title: () => <div style={{ textAlign: "center" }}>Hoàn thành</div>,
    width: 140,
    key: "submittedTotal",
    dataIndex: "submittedTotal",
    sorter: (a, b) => a.submittedTotal - b.submittedTotal,
    render: (submittedTotal: number, record) => (
      <ViewChallengers
        typeChallengerInChallenge="submitted"
        challengeId={record.id}
        value={submittedTotal}
      />
    ),
  },
  {
    title: () => <div style={{ textAlign: "center" }}>Người tạo</div>,
    width: 120,
    key: "owner",
    dataIndex: "owner",
    render: (owner: IDataTypeChallengeList["owner"]) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tooltip placement={"top"} title={owner.fullname}>
          <Avatar src={owner.image || defautlAvatar} />
        </Tooltip>
      </div>
    ),
  },

  {
    width: 200,
    title: "Thời gian tạo",
    key: "createdAt",
    sorter: (a, b) => a.created_at - b.created_at,
    dataIndex: "created_at",
    render: (time) => <div>{convertTimestampToVietnamTime(time)}</div>,
  },
];

export default challengeListColumn;
